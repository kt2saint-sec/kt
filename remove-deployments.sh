#!/bin/bash

# Read token
TOKEN=$(cat ~/.vercel_token)

echo "🗑️  Removing old karl-portfolio deployments..."
echo ""

# List of deployment URLs to remove
DEPLOYMENTS=(
"https://karl-portfolio-6qsp5samx-karl-toussaints-projects.vercel.app"
"https://karl-portfolio-q1uybagjf-karl-toussaints-projects.vercel.app"
"https://karl-portfolio-p60deorer-karl-toussaints-projects.vercel.app"
"https://karl-portfolio-2q3d53vw4-karl-toussaints-projects.vercel.app"
"https://karl-portfolio-2ypuzvrsn-karl-toussaints-projects.vercel.app"
"https://karl-portfolio-39nv5xz0u-karl-toussaints-projects.vercel.app"
"https://karl-portfolio-h8m9t545i-karl-toussaints-projects.vercel.app"
"https://karl-portfolio-lxw5opgi2-karl-toussaints-projects.vercel.app"
"https://karl-portfolio-47urhux1r-karl-toussaints-projects.vercel.app"
"https://karl-portfolio-n95nnz1ot-karl-toussaints-projects.vercel.app"
"https://karl-portfolio-7veikw9jj-karl-toussaints-projects.vercel.app"
"https://karl-portfolio-cx0x7qb9l-karl-toussaints-projects.vercel.app"
"https://karl-portfolio-94e4juhtv-karl-toussaints-projects.vercel.app"
"https://karl-portfolio-btj9kv9zt-karl-toussaints-projects.vercel.app"
"https://karl-portfolio-79e7e0wq6-karl-toussaints-projects.vercel.app"
"https://karl-portfolio-mxozls6ir-karl-toussaints-projects.vercel.app"
"https://karl-portfolio-mce5183ep-karl-toussaints-projects.vercel.app"
"https://karl-portfolio-okeup2r0t-karl-toussaints-projects.vercel.app"
"https://karl-portfolio-a1x82oncy-karl-toussaints-projects.vercel.app"
"https://karl-portfolio-8a4u3nppq-karl-toussaints-projects.vercel.app"
)

# Remove each deployment
for deployment in "${DEPLOYMENTS[@]}"; do
    echo "Removing: $deployment"
    vercel rm "$deployment" --token "$TOKEN" --yes 2>/dev/null || echo "  ⚠️  Could not remove (may already be deleted)"
done

echo ""
echo "✅ Cleanup complete!"
echo ""
echo "🔍 Remaining deployments:"
vercel list --token "$TOKEN" 2>/dev/null || echo "No deployments found"