var admin = require("firebase-admin");

// var serviceAccount = require("../tilliagency.json");

const firebaseConfig = {
  "type": "service_account",
  "project_id": "chattiliiagency",
  "private_key_id": "d49f97f52eada5d22772311381717aaa87279ea7",
  "private_key": "-----BEGIN PRIVATE KEY-----\nMIIEvgIBADANBgkqhkiG9w0BAQEFAASCBKgwggSkAgEAAoIBAQClSAFG+ruMzV1x\nQVLUTwKpHa7wU/mNEDlhX5lwZ/ssTJD7kaVgPCJQZEt0T5b3U3sbis8yD5LFHOCM\naqluLXRMGwJa9uMW4GcN9/rhVpUYW6YxzxrqjvXAitsG6IgmlMYp8Wz/UUdWJQnC\nDCPmQ6FutJ7ejLxhfyibCGwDRWQrSntp+zbGdIr9Yxr8V/xpxNsr61oCqnKJ9L7P\nLSR4zlJrJw2QY1N/MCb8Njej7YSHJKWwhf7IK5286efhCXD1VoWJSdlq+Qg79Ai4\nERUCrTLsbAo7fee5cVCLAFtvnnCNrKYhWgvC9tHR6JgNnqhG0/+iNM+HxLrcWJRx\nuAuqAuErAgMBAAECggEAC1VPJRyp7JiOY5GHn6A//fRXm7TJDq0B9OqBvSKcJ1L5\nZA6oyNsGvVLLQRFODZfaAARPeyQfO8iO9ddAgUS4+Jj82zDvrGYRxZ7vQzFVLY48\nl1DCDJBl9eBvmV8rgChrwtItAlWCmeZrRLThZ0zUOSDwfdvSSlsrn8nUN5CJXase\n8p3ZCoXeERUTitF2UVfDW6N82Ko6DYGEjElNrkpgiRMhqkt13fPtRm4MP/K9KAOy\n7cWEpiR06ctwlhONywxHlJW1JJ7RaF2gdgvYtAJm6axAzLgbUCfzL2l7ZO+XlLdL\ntPvoWB8fGBANWybPVJ4mUiCXyk1z8T79DduRy/XsgQKBgQDi3HzxGvtS5yt3jjB2\n948m2p7nT6RB+Q1YS7an+82Y6g+gS0eOLDZf01lO78WalGQjxwpQWMX/zhzLVikx\nrbfCcGkAfANICDmEkVlMrYaDI4p+hHq2ZgC0eFGsS/GgReEVW2jMbzL2Y6iSbZhm\nFgylr1iwDwIQBEuETj30OoFigQKBgQC6gq5hmblZalImQFy4fXmisSA2zKLa/Qhc\nvGGcGX9LzsGmQCeZ6Sb/KpKQ/mwngW8Ybg7Iucot7lNLYL2s+SwqbverLgZMT7KI\nHpxvBrEv7+TZ9ejJYl6Fru7lnSrXsAXzmE4pJ+l2SOs9o/b2xTnqWBhVC6yAtJ8b\n9V/GBMGVqwKBgQDhLApTYf2cztjlBNvz6UpMPWjFnNYjqWjmf9gfqh3qrj+uUaoH\nYrjhqiyV3gWbpbgzjscc8tAsVE9eP/oJVizzsJF4Kp8zKv60J3SkWAQQPAGmDCak\nzl/awSYHxyVgeJutkBpX9/N0fXx/QoqmoTISbhWwQmVAspKmEucJd9yegQKBgGCo\nUQ8rx67bNu+z81l5TYxPF07PBqdO8wJ8bmmjnSEAacNrBBrzhc4/le2mrQ5cOeMD\nRo4oGutq06gA3svB5m2nTJteIs1xkCiTFKdFZJZfUM7UbmvPmwTU/+HnbciR5MO1\nbuxNTuSKLb+oNdj1pWoZdaK9hgy9jqfCpnvNAzY5AoGBAMQGzKS8b/vZYailQW7a\nHPyEZZ+O9tMoHBPDmS7YDPAgE16vZLugeHVai+f7yRHN3liBd/PguteMmnJ1PtRd\nOFxO8DhXobO3LIpr1Dc3q++UQrSD2wMW2JCT/DkeDX5UwJY3LaCp5xeqIzUqZxU9\n8M5ZIhJ3Y/hCTQD+exuXvA5M\n-----END PRIVATE KEY-----\n",
  "client_email": "firebase-adminsdk-tpa2h@chattiliiagency.iam.gserviceaccount.com",
  "client_id": "108770940867119478633",
  "auth_uri": "https://accounts.google.com/o/oauth2/auth",
  "token_uri": "https://oauth2.googleapis.com/token",
  "auth_provider_x509_cert_url": "https://www.googleapis.com/oauth2/v1/certs",
  "client_x509_cert_url": "https://www.googleapis.com/robot/v1/metadata/x509/firebase-adminsdk-tpa2h%40chattiliiagency.iam.gserviceaccount.com"
};

module.exports = admin.initializeApp({
  credential: admin.credential.cert(firebaseConfig),
});

const db = admin.firestore();

module.exports = db;