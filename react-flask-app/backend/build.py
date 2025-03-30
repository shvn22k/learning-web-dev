import os
import subprocess

def build_frontend():
    frontend_dir = os.path.join(os.path.dirname(os.path.dirname(__file__)), "frontend")
    
    # Install frontend dependencies
    subprocess.run(["npm", "install"], cwd=frontend_dir, check=True)
    
    # Build frontend
    subprocess.run(["npm", "run", "build"], cwd=frontend_dir, check=True)

if __name__ == "__main__":
    build_frontend() 