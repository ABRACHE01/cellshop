# cellshop

## Description & folder structure

cellshope e-commerce platforme powered by microservices.

```bash
root
--apps 
---client 
---server
``` 

* please make sure u run the folowing commands in the root derectory *.

## Installation 

```bash
$ pnpm install
```

## Running the apps (server - client)

```bash
# runing the (server - client) at the sam time however it runs just the server service 
$ pnpm run dev

# runing the (client) only 
$ pnpm -filter client run dev 

# runing a spisefic service in the (server)   
$ pnpm --filter server run dev  <name of your service >
```

## comands for a better managment. 

```bash
#  adding a packages in the client dir 
$ pnpm add <package> --filter=client 

#  adding a packages in the server dir 
$ pnpm add <package> --filter=server 

```

```bash
#  this to insert a command in the server from the root dir "nest commands for example .."
$ pnpm --filter server exec <command>

#  this to insert a command in the client from the root dir 
$ pnpm --filter client exec <command>

```

