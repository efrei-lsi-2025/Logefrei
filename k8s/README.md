# Logefrei sur Kubernetes

## Requis

Helm: ```bash
curl -fsSL -o get_helm.sh https://raw.githubusercontent.com/helm/helm/master/scripts/get-helm-3
chmod 700 get_helm.sh
sudo ./get_helm.sh

````

Traefik comme Ingress Controller: ```bash
helm repo add traefik https://helm.traefik.io/traefik
helm repo update
kubectl create ns traefik
helm install traefik traefik/traefik --namespace traefik
helm upgrade --install traefik \
    --namespace traefik \
    --set dashboard.enabled=true \
    --set rbac.enabled=true \
    --set nodeSelector.node-type=master \
    --set="additionalArguments={--api.dashboard=true,--log.level=INFO,--providers.kubernetesingress.ingressclass=traefik-internal,--serversTransport.insecureSkipVerify=true}" \
    traefik/traefik
````
