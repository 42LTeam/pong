#!/bin/bash

IP_ADDRESS=$(ifconfig | grep -Eo "inet 10\.[0-9]+\.[0-9]+\.[0-9]+" --max-count=1 | awk '{print $2}')

FIRST_OCTET=$(echo $IP_ADDRESS | cut -d "." -f 1)
SECOND_OCTET=$(echo $IP_ADDRESS | cut -d "." -f 2)
THIRD_OCTET=$(echo $IP_ADDRESS | cut -d "." -f 3)
FOURTH_OCTET=$(echo $IP_ADDRESS | cut -d "." -f 4)

LOCALHOST="${FIRST_OCTET}.${SECOND_OCTET}.${THIRD_OCTET}.${FOURTH_OCTET}"

if grep -q "LOCALHOST=" .env; then
    sed -i.bak "s/LOCALHOST=.*/LOCALHOST=$LOCALHOST/" .env
else
    echo "LOCALHOST=$LOCALHOST" >> .env
fi

echo ".env file updated successfully!"