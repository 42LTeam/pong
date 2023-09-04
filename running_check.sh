#!/bin/bash

# Declare an array of service names to check ('front' and 'api' only)
declare -a services=("api" "front")

# Number of retries and delay in seconds
retries=10
delay=10

# Define expected log messages for each service
declare -a expected_logs
expected_logs["api"]="application successfully started"
expected_logs["front"]="ready"

# Iterate through each service and check its status
for service in "${services[@]}"; do
  for ((i=1; i<=retries; i++)); do
    # Try to find the full container name using `docker-compose ps`
    container=$(docker-compose ps -q "$service")

    # Check if container exists
    if [ -z "$container" ]; then
      echo "Container for service $service does not exist or is not running. Attempt $i of $retries."
      sleep "$delay"
      continue
    fi

    # Fetch the status of the container
    STATUS=$(docker inspect --format="{{.State.Status}}" "$container")

    if [ "$STATUS" == "running" ]; then
      echo "Container for service $service is running."

      # Check the log to make sure the service inside the container is ready
      log_output=$(docker logs "$container")
      if [[ "$log_output" == *"${expected_logs[$service]}"* ]]; then
        echo "Service $service is fully initialized."
        break
      else
        echo "Service $service is running but not fully initialized. Attempt $i of $retries."
      fi

    elif [ "$STATUS" == "exited" ]; then
      echo "Container for service $service has exited. Attempt $i of $retries."
    else
      echo "Container for service $service is in $STATUS state. Attempt $i of $retries."
    fi

    sleep "$delay"
  done
done

# Add a statement to indicate if retries are exhausted
if [ "$i" -gt "$retries" ]; then
  echo "Failed to get the proper status for all services after $retries attempts."
  exit 1
fi
