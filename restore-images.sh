#!/bin/bash
# PODDAR — one-command image recovery script
# Run: bash restore-images.sh
# Restores all 23 site images into public/images/ and rebuilds the site.
set -e
cd "$(dirname "$0")"
mkdir -p public/images
IDS="11256510 17139803 33686459 4874406 15313405 10251355 5279317 5279344 9784001 28286038 38040016 26492743 8867208 7679885 8970688 11567138 4963359 8867435 1267329 9301860 4483556 1108572 36397819"
for id in $IDS; do
  if [ ! -f "public/images/${id}.jpg" ]; then
    curl -sL -o "public/images/${id}.jpg" "https://images.pexels.com/photos/${id}/pexels-photo-${id}.jpeg?auto=compress&cs=tinysrgb&fit=crop&h=627&w=1200" &
  fi
done
wait
echo "Images present: $(find public/images -type f | wc -l) / 23"
npm run build >/dev/null 2>&1 && echo "Build OK — dist/images: $(ls dist/images | wc -l) files"
