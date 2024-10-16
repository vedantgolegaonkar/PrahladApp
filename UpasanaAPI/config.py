import psycopg2
from psycopg2 import pool

class Config:
    # Database configuration
    DB_HOST = "localhost"
    DB_PORT = "5432"
    DB_NAME = "Upasana"
    DB_USER = "postgres"
    DB_PASSWORD = "1234"
    
    # Create connection pool for better performance
    connection_pool = pool.SimpleConnectionPool(1, 20,
        host=DB_HOST,
        port=DB_PORT,
        database=DB_NAME,
        user=DB_USER,
        password=DB_PASSWORD
    )

# Function to get a connection from the connection pool
def get_db_connection():
    return Config.connection_pool.getconn()

# Function to release a connection back to the pool
def release_db_connection(conn):
    Config.connection_pool.putconn(conn)