"""
app.py - START HERE
===================
This is the main entry point of the project.
Run this file to start the web server:

    python app.py

Then open http://127.0.0.1:5000 in your browser.
"""

from backend import create_app

# Create the Flask application
app = create_app()

if __name__ == "__main__":
    print("=" * 50)
    print("  AI Twin Server Started!")
    print("  Open: http://127.0.0.1:5000")
    print("  Admin: username=admin  password=admin123")
    print("=" * 50)
    app.run(debug=True, port=5000)
