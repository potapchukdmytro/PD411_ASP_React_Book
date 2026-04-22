FROM mcr.microsoft.com/dotnet/sdk:9.0 AS build
WORKDIR /app

COPY ["PD411_Books.API/PD411_Books.API.csproj", "PD411_Books.API/"]
COPY ["PD411_Books.BLL/PD411_Books.BLL.csproj", "PD411_Books.BLL/"]
COPY ["PD411_Books.DAL/PD411_Books.DAL.csproj", "PD411_Books.DAL/"]
RUN dotnet restore ./PD411_Books.API/PD411_Books.API.csproj

COPY . ./
RUN dotnet publish -c Release -o out ./PD411_Books.API/PD411_Books.API.csproj

FROM mcr.microsoft.com/dotnet/aspnet:9.0
WORKDIR /app
COPY --from=build /app/out .
ENTRYPOINT ["dotnet", "PD411_Books.API.dll"]