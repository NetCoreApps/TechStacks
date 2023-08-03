FROM mcr.microsoft.com/dotnet/sdk:6.0 AS build
WORKDIR /app

COPY . .
RUN dotnet restore

WORKDIR /app/TechStacks
RUN dotnet publish -c release -o /out --no-restore

FROM mcr.microsoft.com/dotnet/aspnet:6.0 AS runtime

RUN --mount=type=secret,id=SERVICESTACK_LICENSE \
    --mount=type=secret,id=FORUMS_DB \
    --mount=type=secret,id=TECHSTACKS_SMTP_USER \
    --mount=type=secret,id=TECHSTACKS_SMTP_PASS \
    export SERVICESTACK_LICENSE=$(cat /run/secrets/SERVICESTACK_LICENSE) && \
    export FORUMS_DB=$(cat /run/secrets/FORUMS_DB) && \
    export TECHSTACKS_SMTP_USER=$(cat /run/secrets/TECHSTACKS_SMTP_USER) && \
    export TECHSTACKS_SMTP_PASS=$(cat /run/secrets/TECHSTACKS_SMTP_PASS)

WORKDIR /app
COPY --from=build /out ./
ENTRYPOINT ["dotnet", "TechStacks.dll"]