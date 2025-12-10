NET="websight-streamx-network-$(date +%s)"
docker network create "$NET"
echo "Created network: $NET"

docker network connect "$NET" rest-ingestion.service
docker network connect "$NET" websight-cms