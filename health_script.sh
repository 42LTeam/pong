#!/bin/bash

retries=10
delay=5
url="http://localhost:5173"

for ((i=1; i<=retries; i++)); do
    response=$(curl -s "$url")
    if [[ ! -z "$response" ]]; then
        echo "Service on http://localhost:5173/ is up and running!"
        exit 0
    else
        echo "Service not ready. Attempt $i of $retries."
        sleep "$delay"
    fi
done

url="http://localhost:3000/api"

for ((i=1; i<=retries; i++)); do
    response=$(curl -s "$url")
    if [[ ! -z "$response" ]]; then
        echo "Service on http://localhost:3000/api is up and running!"
        exit 0
    else
        echo "Service not ready. Attempt $i of $retries."
        sleep "$delay"
    fi
done

echo "Failed to connect to services after $retries attempts."
exit 1
