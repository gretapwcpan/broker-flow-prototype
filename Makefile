# Broker Flow Prototype Makefile

.PHONY: install dev clean test lint format run-backend run-frontend generate-docs help

# Default target
help:
	@echo "Available commands:"
	@echo "  install      - Install dependencies"
	@echo "  dev          - Install development dependencies"
	@echo "  clean        - Clean build artifacts"
	@echo "  test         - Run tests"
	@echo "  lint         - Run linting"
	@echo "  format       - Format code"
	@echo "  run-backend  - Start backend server"
	@echo "  run-frontend - Start frontend server"
	@echo "  generate-docs - Generate sample documents"
	@echo "  setup        - Complete development setup"

# Check if uv is available, fallback to pip
PYTHON_INSTALLER := $(shell command -v uv >/dev/null 2>&1 && echo "uv pip install" || echo "pip install")

# Installation
install:
	$(PYTHON_INSTALLER) -e .

dev: install
	$(PYTHON_INSTALLER) -e ".[dev]"

# Development setup with uv (recommended)
setup-uv:
	@echo "Setting up with uv (recommended for speed)..."
	uv venv
	uv pip install -e ".[dev]"
	@mkdir -p documents database logs
	@echo "Development environment ready! Activate with: source .venv/bin/activate"

# Traditional setup
setup: dev
	@echo "Setting up development environment..."
	@mkdir -p documents database logs
	@echo "Development environment ready!"

# Install uv if not present
install-uv:
	curl -LsSf https://astral.sh/uv/install.sh | sh

# Code quality
lint:
	flake8 backend data_generation
	mypy backend data_generation

format:
	black backend data_generation
	isort backend data_generation

# Testing
test:
	pytest -v

# Running services
run-backend:
	PYTHONPATH=backend python backend/main.py

run-frontend:
	cd frontend && npm start

run-both:
	@echo "Starting backend and frontend..."
	@PYTHONPATH=backend nohup python backend/main.py > logs/backend.log 2>&1 & echo $$! > logs/backend.pid
	@cd frontend && npm start

# Document generation
generate-docs:
	cd data_generation && python pdf_generator.py

# Cleanup
clean:
	find . -type d -name "__pycache__" -exec rm -rf {} +
	find . -type f -name "*.pyc" -delete
	find . -type f -name "*.pyo" -delete
	find . -type d -name "*.egg-info" -exec rm -rf {} +
	rm -rf build/ dist/ .pytest_cache/ .coverage htmlcov/