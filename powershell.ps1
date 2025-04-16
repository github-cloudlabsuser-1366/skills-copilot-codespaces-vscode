# Ensure you are logged in to Azure
Connect-AzAccount

# Variables for the deployment
$resourceGroupName = "MyResourceGroup"
$location = "EastUS"
$vmName = "MyVM"
$vmSize = "Standard_DS1_v2"
$imagePublisher = "Canonical"
$imageOffer = "UbuntuServer"
$imageSku = "18.04-LTS"
$adminUsername = "azureuser"
$adminPassword = "P@ssw0rd1234!" # Replace with a secure password

# Create a resource group
Write-Host "Creating resource group..."
New-AzResourceGroup -Name $resourceGroupName -Location $location

# Create a virtual network and subnet
Write-Host "Creating virtual network and subnet..."
$vnet = New-AzVirtualNetwork -ResourceGroupName $resourceGroupName -Location $location -Name "MyVNet" -AddressPrefix "10.0.0.0/16"
$subnet = Add-AzVirtualNetworkSubnetConfig -Name "MySubnet" -AddressPrefix "10.0.0.0/24" -VirtualNetwork $vnet
$vnet | Set-AzVirtualNetwork

# Create a public IP address
Write-Host "Creating public IP address..."
$publicIp = New-AzPublicIpAddress -ResourceGroupName $resourceGroupName -Location $location -Name "MyPublicIP" -AllocationMethod Dynamic

# Create a network security group
Write-Host "Creating network security group..."
$nsg = New-AzNetworkSecurityGroup -ResourceGroupName $resourceGroupName -Location $location -Name "MyNSG"

# Create a network interface
Write-Host "Creating network interface..."
$nic = New-AzNetworkInterface -ResourceGroupName $resourceGroupName -Location $location -Name "MyNIC" -SubnetId $subnet.Id -PublicIpAddressId $publicIp.Id -NetworkSecurityGroupId $nsg.Id

# Create a virtual machine configuration
Write-Host "Creating virtual machine configuration..."
$vmConfig = New-AzVMConfig -VMName $vmName -VMSize $vmSize |
    Set-AzVMOperatingSystem -Linux -ComputerName $vmName -Credential (New-Object PSCredential ($adminUsername, (ConvertTo-SecureString $adminPassword -AsPlainText -Force))) |
    Set-AzVMSourceImage -PublisherName $imagePublisher -Offer $imageOffer -Skus $imageSku -Version "latest" |
    Add-AzVMNetworkInterface -Id $nic.Id

# Deploy the virtual machine
Write-Host "Deploying virtual machine..."
New-AzVM -ResourceGroupName $resourceGroupName -Location $location -VM $vmConfig

Write-Host "Virtual machine deployment complete!"