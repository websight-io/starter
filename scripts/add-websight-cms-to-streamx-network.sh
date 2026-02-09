NET="websight-streamx-network-$(date +%s)"
docker network create "$NET"
echo "Created network: $NET"

docker network connect "$NET" rest-ingestion.proxy
docker network connect "$NET" websight-cms