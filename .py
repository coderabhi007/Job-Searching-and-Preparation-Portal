import numpy as np
import pandas as pd
from sklearn.cluster import AgglomerativeClustering
from sklearn.preprocessing import StandardScaler
import requests
import matplotlib.pyplot as plt

# Step 1: Fetch students' data from the API
def fetch_students_data(api_url):
    try:
        response = requests.get(api_url)
        response.raise_for_status()  # Will raise an HTTPError for bad responses
        return response.json()  # Assuming the API returns JSON data
    except requests.exceptions.RequestException as e:
        print(f"Error fetching data from API: {e}")
        return None

# Step 2: Prepare Data (convert the API data into a DataFrame)
def prepare_data_from_api(data, required_skills):
    student_data = []
    names = []
    
    for student in data:
        names.append(student["name"])
        row = [student["skills"].get(skill, 0) for skill in required_skills]
        student_data.append(row)
    
    # Create DataFrame
    df = pd.DataFrame(student_data, columns=required_skills, index=names)
    return df

# Step 3: Normalize the data
def normalize_data(df):
    scaler = StandardScaler()
    return scaler.fit_transform(df)

# Step 4: Apply Agglomerative Clustering
def apply_clustering(data):
    cluster = AgglomerativeClustering(n_clusters=2)
    return cluster.fit_predict(data)

# Step 5: Main Function to handle API call and clustering
def cluster_students(api_url, required_skills):
    # Fetch students' data from the API
    students_data = fetch_students_data(api_url)
    if not students_data:
        return "Failed to fetch students' data from API."
    
    # Prepare DataFrame from the API data
    df = prepare_data_from_api(students_data, required_skills)
    
    # Normalize data
    X_scaled = normalize_data(df)
    
    # Apply Agglomerative Clustering
    df['Cluster'] = apply_clustering(X_scaled)
    
    # Calculate total score for each student
    df['Total_Score'] = df[required_skills].sum(axis=1)
    
    # Sort students by Total Score within each cluster
    df_sorted = df.sort_values(by=['Cluster', 'Total_Score'], ascending=[True, False])

    # Visualize the clusters (optional)
    plt.figure(figsize=(10, 6))
    plt.scatter(df['Python'], df['Java'], c=df['Cluster'], cmap='viridis')
    plt.title('Agglomerative Clustering of Students Based on Skill Scores')
    plt.xlabel('Python Score')
    plt.ylabel('Java Score')
    plt.colorbar(label='Cluster')
    plt.show()

    return df_sorted

# Example API URL
api_url = "https://localhost:8001/getStudent"  # Replace with your API URL
required_skills = ["Python", "Java", "SQL"]  # Skills required for clustering

# Call the function and get the results
result = cluster_students(api_url, required_skills)
if isinstance(result, pd.DataFrame):
    print("Sorted Students in Each Cluster:")
    for cluster_num in result['Cluster'].unique():
        print(f"\nCluster {cluster_num}:")
        cluster_students = result[result['Cluster'] == cluster_num]
        print(cluster_students[['Total_Score', 'Python', 'Java', 'SQL']])
