#!/bin/bash

# Tourist Companion - Deployment Setup Script
# This script helps you prepare your app for deployment

echo "======================================"
echo "  Tourist Companion Deployment Setup  "
echo "======================================"
echo ""

# Check if git is installed
if ! command -v git &> /dev/null; then
    echo "❌ Git is not installed. Please install Git first:"
    echo "   https://git-scm.com/downloads"
    exit 1
fi

echo "✅ Git is installed"
echo ""

# Check if already a git repository
if [ -d ".git" ]; then
    echo "⚠️  This is already a git repository."
    echo ""
    read -p "Do you want to create a new repository? (y/n) " -n 1 -r
    echo ""
    if [[ $REPLY =~ ^[Yy]$ ]]; then
        echo "Removing existing .git directory..."
        rm -rf .git
    else
        echo "Keeping existing repository. You can now push to GitHub."
        exit 0
    fi
fi

# Initialize git repository
echo "📦 Initializing git repository..."
git init
git branch -M main

# Add all files
echo "📝 Adding files to git..."
git add .

# Create initial commit
echo "💾 Creating initial commit..."
git commit -m "Initial commit - Tourist Companion app with Booking.com affiliate support"

echo ""
echo "✅ Git repository initialized successfully!"
echo ""
echo "======================================"
echo "  Next Steps:"
echo "======================================"
echo ""
echo "1. Create a GitHub repository:"
echo "   - Go to https://github.com/new"
echo "   - Name it: tourist-companion"
echo "   - Don't initialize with README (we already have one)"
echo "   - Click 'Create repository'"
echo ""
echo "2. Link your local repository to GitHub:"
echo "   git remote add origin https://github.com/YOUR_USERNAME/tourist-companion.git"
echo ""
echo "3. Push your code:"
echo "   git push -u origin main"
echo ""
echo "4. Follow the DEPLOYMENT.md guide to deploy to Vercel, Render, or Railway"
echo ""
echo "======================================"
echo ""
echo "Need help? Check out DEPLOYMENT.md for detailed instructions!"
echo ""
