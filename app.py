
from flask import Flask, render_template
import boto3
from botocore.exceptions import ClientError

app = Flask(__name__)

# AWS S3 configuration
S3_BUCKET = "grocerybucket2026"
S3_REGION = "ap-southeast-2"

# Connect to S3 using EC2 IAM Role
s3 = boto3.client(
    "s3",
    region_name=S3_REGION
)

# Grocery products
products = [
    {
        "id": 1,
        "name": "Banana",
        "category": "Fruits",
        "price": 40,
        "unit": "dozen",
        "image": "banana.png"
    },
    {
        "id": 2,
        "name": "Apple",
        "category": "Fruits",
        "price": 120,
        "unit": "kg",
        "image": "apple.png"
    },
    {
        "id": 3,
        "name": "Tomato",
        "category": "Vegetables",
        "price": 35,
        "unit": "kg",
        "image": "tomato.png"
    },
    {
        "id": 4,
        "name": "Potato",
        "category": "Vegetables",
        "price": 30,
        "unit": "kg",
        "image": "potato.png"
    }
]

@app.route("/")
def home():

    for product in products:
        try:
            product["image_url"] = s3.generate_presigned_url(
                "get_object",
                Params={
                    "Bucket": S3_BUCKET,
                    "Key": product["image"]
                },
                ExpiresIn=3600
            )
        except ClientError as error:
            print("S3 error:", error)
            product["image_url"] = ""

    return render_template(
        "index.html",
        products=products
    )

@app.route("/health")
def health():
    return {"status": "running"}

if __name__ == "__main__":
    app.run(
        host="0.0.0.0",
        port=5000,
        debug=False
    )
