#!/bin/bash

# Automation Test Store - Test Runner Script

echo "🚀 Automation Test Store - Playwright Test Runner"
echo "================================================"

# Check if .env file exists and set default credentials if not
if [ ! -f .env ]; then
    echo "⚠️  Warning: .env file not found. Using default credentials."
    echo "   Create .env file with your credentials for production use."
    
    # Set default environment variables
    export USERNAME=sharjeel
    export PASSWORD=ahmad12
    export BASE_URL=https://automationteststore.com/
    echo "   Using default credentials: USERNAME=sharjeel, PASSWORD=ahmad12"
else
    echo "✅ .env file found, loading credentials..."
    export $(cat .env | xargs)
fi

# Function to run tests
run_tests() {
    local mode=$1
    local browser=$2
    
    echo ""
    echo "🧪 Running tests in $mode mode..."
    echo "🌐 Base URL: ${BASE_URL:-'https://automationteststore.com/'}"
    echo "👤 Username: ${USERNAME:-'sharjeel'}"
    
    if [ "$browser" != "" ]; then
        echo "🌐 Browser: $browser"
        npx playwright test --project=$browser
    else
        npx playwright test
    fi
    
    if [ $? -eq 0 ]; then
        echo "✅ Tests completed successfully!"
        echo "📊 Opening test report..."
        npx playwright show-report
    else
        echo "❌ Tests failed. Check the output above for details."
        exit 1
    fi
}

# Parse command line arguments
case "$1" in
    "headed")
        run_tests "headed" ""
        ;;
    "debug")
        echo "🔍 Running tests in debug mode..."
        npx playwright test --debug
        ;;
    "ui")
        echo "🖥️  Opening Playwright UI..."
        npx playwright test --ui
        ;;
    "firefox")
        run_tests "headed" "firefox"
        ;;
    "webkit")
        run_tests "headed" "webkit"
        ;;
    "chromium")
        run_tests "headed" "chromium"
        ;;
    "install")
        echo "📦 Installing Playwright browsers..."
        npx playwright install
        ;;
    *)
        echo "Usage: $0 {headed|debug|ui|firefox|webkit|chromium|install}"
        echo ""
        echo "Options:"
        echo "  headed    - Run tests with browser visible"
        echo "  debug     - Run tests in debug mode"
        echo "  ui        - Open Playwright UI"
        echo "  firefox   - Run tests in Firefox"
        echo "  webkit    - Run tests in WebKit (Safari)"
        echo "  chromium  - Run tests in Chromium"
        echo "  install   - Install Playwright browsers"
        echo ""
        echo "Default: Run tests in headless mode"
        run_tests "headless" ""
        ;;
esac
