# Hyperledger Fabric Setup on Windows

Hyperledger Fabric's local test network requires a Unix-like environment (specifically `bash`, `make`, and `docker`) to run its infrastructure scripts. Because these scripts cannot run natively on Windows PowerShell or Command Prompt, you must use **Windows Subsystem for Linux (WSL2)**.

This guide explains how to transition your Windows machine into a Fabric-ready environment.

---

## 1. Install WSL2 (Windows Subsystem for Linux)

WSL2 allows you to run a full Linux distribution natively on Windows.

1. Open PowerShell as **Administrator**.
2. Run the following command:
   ```powershell
   wsl --install
   ```
   *(This will install Ubuntu by default and enable the necessary Windows features).*
3. **Restart your computer** when prompted.
4. After restarting, a Linux terminal will automatically open to finish the installation. You will be asked to create a Linux username and password.

---

## 2. Configure Docker Desktop for WSL2

Hyperledger Fabric runs its Certificate Authorities (CAs), Orderers, and Peers inside Docker containers.

1. Download and install [Docker Desktop for Windows](https://www.docker.com/products/docker-desktop/).
2. Open Docker Desktop.
3. Go to **Settings** (the gear icon in the top right) > **General**.
4. Check the box that says **"Use the WSL 2 based engine"**.
5. Go to **Settings** > **Resources** > **WSL Integration**.
6. Ensure that integration is enabled for your default WSL distribution (e.g., Ubuntu).
7. Click **Apply & Restart**.

---

## 3. Install Fabric Prerequisites Inside WSL2

Now that WSL2 and Docker are running, open your **Ubuntu** terminal (you can find it in the Windows Start menu). 
Run all of the following commands **inside the Ubuntu terminal**:

### Install curl, git, and jq
```bash
sudo apt-get update
sudo apt-get install -y curl git jq make
```

### Install Node.js (Using NVM)
Fabric Smart Contracts (Chaincode) and our NestJS backend require Node.js.
```bash
curl -o- https://raw.githubusercontent.com/nvm-sh/nvm/v0.39.5/install.sh | bash
source ~/.bashrc
nvm install 18
nvm use 18
```

### Install Go (Required for some Fabric binaries)
```bash
wget https://go.dev/dl/go1.21.0.linux-amd64.tar.gz
sudo rm -rf /usr/local/go
sudo tar -C /usr/local -xzf go1.21.0.linux-amd64.tar.gz
echo 'export PATH=$PATH:/usr/local/go/bin' >> ~/.bashrc
source ~/.bashrc
```

---

## 4. Download Hyperledger Fabric

Still inside your **Ubuntu** terminal, navigate to the Linux equivalent of your Windows project folder.
*(In WSL, your C: drive is mounted at `/mnt/c/`, your D: drive is at `/mnt/d/`, etc.)*

```bash
# Navigate to your project folder (Replace with your actual path if different)
cd /mnt/d/yash/Projects/blockChain/Blockchain-pharmaceutical-traceability/blockchain

# Download Fabric Binaries, Docker Images, and the fabric-samples repo
curl -sSLO https://raw.githubusercontent.com/hyperledger/fabric/main/scripts/install-fabric.sh && chmod +x install-fabric.sh
./install-fabric.sh docker samples binary
```

---

## 5. Start the Fabric Test Network

Once the `fabric-samples` folder has downloaded successfully, you can spin up the blockchain!

```bash
cd fabric-samples/test-network

# Bring down any existing networks to start fresh
./network.sh down

# Bring up the network, create a channel named 'mychannel', and use Certificate Authorities (-ca)
./network.sh up createChannel -c mychannel -ca
```

If successful, you will see output indicating that `peer0.org1`, `peer0.org2`, and the `orderer` are up and running as Docker containers.

---

## 6. Deploy the PharmaChain Smart Contract

Now we must package and deploy the TypeScript Chaincode we wrote.

```bash
# Still inside fabric-samples/test-network
# We use the deployCC command and point it to your chaincode folder
./network.sh deployCC -ccn pharmachain -ccp ../../chaincode -ccl typescript
```

This command will:
1. Compile your TypeScript code using `npm install` and `npm run build`.
2. Package the code.
3. Install it on `peer0.org1` and `peer0.org2`.
4. Approve and commit the chaincode definition to the channel.

---

## 7. Next Steps: Wiring the Backend

Once the network is running and the chaincode is deployed, you will need to update the NestJS `FabricService` to stop using the mock implementation and instead connect using the Crypto Certificates generated inside `fabric-samples/test-network/organizations/peerOrganizations/`. 

Please reach out when you reach this step, and I can write the real `@hyperledger/fabric-gateway` implementation for your NestJS application!
