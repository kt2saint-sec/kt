#!/bin/bash
# Vercel Deployment Cleanup Script
# Run this after authenticating with: vercel login

echo "🔍 Fetching deployment list..."
cd ~/ktsaint-sec.github.io

# Login to Vercel (interactive)
echo "📝 Please login to Vercel:"
vercel login

# List all deployments
echo ""
echo "📋 Your deployments:"
vercel list

# Get deployment URLs to delete
echo ""
echo "💡 To delete specific deployments, use:"
echo "   vercel remove [deployment-url]"
echo ""
echo "💡 To delete all except production:"
echo "   vercel remove --safe"
echo ""
echo "💡 To see more details about a deployment:"
echo "   vercel inspect [deployment-url]"

# Optional: Remove all non-production deployments
read -p "Do you want to remove all non-production deployments? (y/n) " -n 1 -r
echo
if [[ $REPLY =~ ^[Yy]$ ]]
then
    vercel remove --safe --yes
    echo "✅ Non-production deployments removed!"
fi

echo ""
echo "🎉 Cleanup complete! Your latest deployment should now be active."