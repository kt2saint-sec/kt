#!/bin/bash

# Read token from secure file
TOKEN=$(cat ~/.vercel_token)

echo "🔍 Listing Vercel projects..."
vercel projects ls --token "$TOKEN"

echo ""
echo "🔍 Listing deployments for karl-portfolio..."
# Try to list deployments for the karl-portfolio project
vercel ls karl-portfolio --token "$TOKEN" 2>/dev/null || vercel list --token "$TOKEN"

echo ""
echo "📋 Available commands:"
echo "  To remove a specific deployment: vercel rm [deployment-url] --token \$TOKEN"
echo "  To see more info: vercel inspect [deployment-url] --token \$TOKEN"