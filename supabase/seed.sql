insert into public.posts (title, slug, description, content, category, reading_time, published_at, tags, emoji, featured)
values 
  (
    'Understanding Kubernetes Service Types',
    'understanding-kubernetes-services',
    'A deep dive into ClusterIP, NodePort, LoadBalancer, and ExternalName services, and when you should use each in production clusters.',
    '## Introduction to Services

In Kubernetes, Pods are ephemeral. If a Pod dies and is recreated, it gets a new IP address. A **Service** is an abstraction that defines a logical set of Pods and a policy by which to access them.

### 1. ClusterIP

This is the default type. It exposes the Service on an internal IP in the cluster. This makes the Service only reachable from within the cluster.

```yaml
apiVersion: v1
kind: Service
metadata:
  name: my-internal-service
spec:
  selector:
    app: my-app
  ports:
    - protocol: TCP
      port: 80
      targetPort: 9376
```

### 2. NodePort

Exposes the Service on each Node''s IP at a static port (the `NodePort`). You''ll be able to contact the NodePort Service, from outside the cluster, by requesting `<NodeIP>:<NodePort>`.

### 3. LoadBalancer

Exposes the Service externally using a cloud provider''s load balancer. NodePort and ClusterIP Services, to which the external load balancer routes, are automatically created.

- [x] Provision cloud balancer
- [x] Configure health checks
- [ ] Set up DNS mapping

> **Pro-tip:** Use an Ingress Controller instead of many LoadBalancer services to save on cloud costs.',
    'Kubernetes',
    6,
    '2024-03-20T10:00:00Z',
    ARRAY['Kubernetes', 'Networking', 'DevOps'],
    '☸️',
    true
  ),
  (
    'How MLflow Tracks Experiments',
    'mlflow-experiment-tracking',
    'Setting up a robust tracking server to log hyperparameters, model artifacts, and evaluation metrics across distributed training runs.',
    '## The Problem with Manual Tracking

When training deep learning models or testing different algorithms, you often experiment with hundreds of hyperparameter combinations. Keeping track of these runs using spreadsheets or text files breaks down quickly.

### Connecting to MLflow

```python
import mlflow

# Set the remote tracking URI
mlflow.set_tracking_uri("http://your-mlflow-server:5000")
mlflow.set_experiment("fraud-detection-model")

# Start a run
with mlflow.start_run():
    mlflow.log_param("learning_rate", 0.01)
    mlflow.log_param("batch_size", 64)
    
    # Train model here...
    accuracy = 0.94
    
    mlflow.log_metric("accuracy", accuracy)
    mlflow.sklearn.log_model(model, "model")
```

### Key Components

- **Tracking Server:** A REST API that logs data
- **Backend Store:** A database (PostgreSQL/MySQL) storing metadata
- **Artifact Store:** Cloud storage (S3/GCS) storing the actual model weights

This architecture ensures your data scientists never lose a model version again.',
    'MLflow',
    4,
    '2024-03-15T10:00:00Z',
    ARRAY['MLOps', 'Python', 'Data Science'],
    '📊',
    false
  ),
  (
    'Terraform State Management Basics',
    'terraform-state-management',
    'Why local state files are dangerous, and how to securely migrate your Terraform state to an AWS S3 backend with DynamoDB locking.',
    '## The State File Dilemma

Terraform relies on a state file (`terraform.tfstate`) to map your real-world infrastructure to your configuration. By default, this is stored locally.

If you work on a team, a local state file means:
- No shared source of truth
- Concurrent modification conflicts
- Leaked secrets (state files often contain cleartext passwords)

### The Solution: Remote State

You need a remote backend. AWS S3 combined with DynamoDB for state locking is the industry standard.

```hcl
terraform {
  backend "s3" {
    bucket         = "my-terraform-state-bucket"
    key            = "prod/terraform.tfstate"
    region         = "us-east-1"
    encrypt        = true
    dynamodb_table = "terraform-lock"
  }
}
```

### Migration Steps

1. Create the S3 Bucket (Enable versioning!)
2. Create the DynamoDB table (Partition key must be `LockID`)
3. Add the backend configuration to your code
4. Run `terraform init` to migrate the state',
    'Terraform',
    5,
    '2024-03-10T10:00:00Z',
    ARRAY['Infrastructure as Code', 'AWS', 'Security'],
    '🏗️',
    false
  );
