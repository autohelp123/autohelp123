provider "aws" {
  region = "us-west-2"
}

resource "aws_instance" "example" {
  ami           = "ami-0c55b159cbfafe1f0" # Replace with your preferred AMI
  instance_type = "t2.micro"

  tags = {
    Name = "terraform-example"
  }
}

provider "kubernetes" {
  config_path = "~/.kube/config"
}

resource "kubernetes_namespace" "example" {
  metadata {
    name = "example-namespace"
  }
}

resource "kubernetes_deployment" "example" {
  metadata {
    name      = "example-deployment"
    namespace = kubernetes_namespace.example.metadata[0].name
  }

  spec {
    replicas = 2

    selector {
      match_labels = {
        app = "example-app"
      }
    }

    template {
      metadata {
        labels = {
          app = "example-app"
        }
      }

      spec {
        container {
          name  = "example-container"
          image = "node:14" # Replace with your preferred Node.js image

          port {
            container_port = 3000
          }
        }
      }
    }
  }
}

resource "kubernetes_service" "example" {
  metadata {
    name      = "example-service"
    namespace = kubernetes_namespace.example.metadata[0].name
  }

  spec {
    selector = {
      app = "example-app"
    }

    port {
      port        = 80
      target_port = 3000
    }
  }
}

resource "kubernetes_ingress" "example" {
  metadata {
    name      = "example-ingress"
    namespace = kubernetes_namespace.example.metadata[0].name
  }

  spec {
    rule {
      http {
        path {
          path = "/"
          backend {
            service_name = kubernetes_service.example.metadata[0].name
            service_port = 80
          }
        }
      }
    }
  }
}
