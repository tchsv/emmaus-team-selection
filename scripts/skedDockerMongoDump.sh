while true
    do
        sleep 21600
        docker exec emmaus-mongo sh -c 'exec mongodump -d emmaus-team-selection-dev483 --archive' >  walk_data-$(date +%Y-%m-%d-%H-%M-%S).archive
    done
