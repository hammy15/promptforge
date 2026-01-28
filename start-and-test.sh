#!/bin/bash
pkill -f "next dev" 2>/dev/null || true
sleep 2
npm run dev > /tmp/dev-server.log 2>&1 &
sleep 10
curl -s http://localhost:3000/playground | grep -E "(Choose Template|Try Demo|Fill Details|Get Prompt)" | head -5
