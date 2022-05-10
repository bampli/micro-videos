# Forum

[A 'super' call must be the first statement in the constructor when a class contains initialized properties](https://forum.code.education/forum/topico/a-super-call-must-be-the-first-statement-in-the-constructor-when-a-class-contains-initialized-properties-1436/)

## post-a

Oi Luiz, tudo blz. Obrigado pela resposta. Estou usando Ubuntu. Estava mantendo o Vscode na versão 1.60.2 porque tinha dado problema nas últimas atualizações. Quanto ao Typescript a versão 4.6.4 que uso é a última disponível, li que há previsão de sair a versão 4.7 RC nessa semana. Com a última versão do Vscode 1.67.0, segue o log abaixo, ocorre erro após tentar abrir o remote container: "An error ocurred setting up the container". Estava fugindo das atualizações por causa disso.

Tentei deletar o diretório .devcontainer para gerar um novo mas não resolveu. Alguma dica? Valeu mais uma vez!

```

[163 ms] Remote-Containers 0.194.3 in VS Code 1.67.0 (57fd6d0195bb9b9d1b49f6da5db789060795de47).
[162 ms] Start: Resolving Remote
[191 ms] Setting up container for folder or workspace: /home/jo/fc2/micro-videos
[195 ms] Start: Check Docker is running
[195 ms] Start: Run: docker version --format {{.Server.APIVersion}}
[256 ms] Server API version: 1.41
[271 ms] Start: Run: docker-compose version --short
[899 ms] Start: Run: docker ps -q -a --filter label=com.docker.compose.project=micro-videos --filter label=com.docker.compose.service=app
[953 ms] Start: Run: docker inspect --type container e9661dc2f5ab
[1004 ms] Start: Run: docker-compose -f /home/jo/fc2/micro-videos/docker-compose.yaml -f /home/jo/fc2/micro-videos/docker-compose.override.yaml -f /home/jo/fc2/micro-videos/.devcontainer/docker-compose.yml config
[1680 ms] services:
  app:
    build:
      context: /home/jo/fc2/micro-videos
    command: /bin/sh -c "while sleep 1000; do :; done"
    container_name: micro-videos-app
    volumes:
    - /home/jo/fc2/micro-videos/.docker/zsh/powerlevel10k/.p10k.zsh:/home/node/.p10k.zsh:delegated
    - /home/jo/fc2/micro-videos:/home/node/app:cached
    - /home/jo/fc2/micro-videos/.docker/zsh/history:/home/node/zsh:delegated
version: '3'

[1681 ms] 
[1684 ms] Start: Run: docker -v
[1739 ms] Start: Run: docker events --format {{json .}} --filter event=start
[1745 ms] Start: Run: docker inspect --type image micro-videos_app
[1801 ms] Start: Run: docker build -f /tmp/vsch/updateUID.Dockerfile-0.194.3 -t vsc-micro-videos-0386fb4fd626d9e946dc85d9556a3856-uid --build-arg BASE_IMAGE=micro-videos_app --build-arg REMOTE_USER=node --build-arg NEW_UID=1000 --build-arg NEW_GID=1000 --build-arg IMAGE_USER=node /tmp/vsch
Sending build context to Docker daemon  3.072kB
Step 1/10 : ARG BASE_IMAGE
Step 2/10 : FROM $BASE_IMAGE
 ---> d5d3f7779e7b
Step 3/10 : USER root
 ---> Using cache
 ---> 2c89527e5b18
Step 4/10 : ARG REMOTE_USER
 ---> Using cache
 ---> 947a9330d096
Step 5/10 : ARG NEW_UID
 ---> Using cache
 ---> 298423c1679c
Step 6/10 : ARG NEW_GID
 ---> Using cache
 ---> 2c56a6005047
Step 7/10 : SHELL ["/bin/sh", "-c"]
 ---> Using cache
 ---> 6e488ff12d9c
Step 8/10 : RUN eval $(sed -n "s/${REMOTE_USER}:[^:]*:\([^:]*\):\([^:]*\):[^:]*:\([^:]*\).*/OLD_UID=\1;OLD_GID=\2;HOME_FOLDER=\3/p" /etc/passwd);       eval $(sed -n "s/\([^:]*\):[^:]*:${NEW_UID}:.*/EXISTING_USER=\1/p" /etc/passwd);       eval $(sed -n "s/\([^:]*\):[^:]*:${NEW_GID}:.*/EXISTING_GROUP=\1/p" /etc/group); if [ -z "$OLD_UID" ]; then              echo "Remote user not found in /etc/passwd ($REMOTE_USER).";    elif [ "$OLD_UID" = "$NEW_UID" -a "$OLD_GID" = "$NEW_GID" ]; then               echo "UIDs and GIDs are the same ($NEW_UID:$NEW_GID)."; elif [ "$OLD_UID" != "$NEW_UID" -a -n "$EXISTING_USER" ]; then          echo "User with UID exists ($EXISTING_USER=$NEW_UID).";         elif [ "$OLD_GID" != "$NEW_GID" -a -n "$EXISTING_GROUP" ]; then                 echo "Group with GID exists ($EXISTING_GROUP=$NEW_GID).";       else            echo "Updating UID:GID from $OLD_UID:$OLD_GID to $NEW_UID:$NEW_GID.";           sed -i -e "s/\(${REMOTE_USER}:[^:]*:\)[^:]*:[^:]*/\1${NEW_UID}:${NEW_GID}/" /etc/passwd;               if [ "$OLD_GID" != "$NEW_GID" ]; then     sed -i -e "s/\([^:]*:[^:]*:\)${OLD_GID}:/\1${NEW_GID}:/" /etc/group;            fi;          chown -R $NEW_UID:$NEW_GID $HOME_FOLDER;        fi;
 ---> Using cache
 ---> 5921ef1acdcf
Step 9/10 : ARG IMAGE_USER
 ---> Using cache
 ---> 6967b4491114
Step 10/10 : USER $IMAGE_USER
 ---> Using cache
 ---> f2f654986edc
Successfully built f2f654986edc
Successfully tagged vsc-micro-videos-0386fb4fd626d9e946dc85d9556a3856-uid:latest
[1940 ms] Start: Run: docker-compose --project-name micro-videos -f /home/jo/fc2/micro-videos/docker-compose.yaml -f /home/jo/fc2/micro-videos/docker-compose.override.yaml -f /home/jo/fc2/micro-videos/.devcontainer/docker-compose.yml -f /tmp/docker-compose.devcontainer.containerFeatures-1652193654726.yml up -d
Starting micro-videos-app ... done
[3399 ms] Start: Run: docker ps -q -a --filter label=com.docker.compose.project=micro-videos --filter label=com.docker.compose.service=app
[3453 ms] Start: Run: docker inspect --type container e9661dc2f5ab
[3515 ms] Start: Inspecting container
[3516 ms] Start: Run: docker inspect --type container e9661dc2f5ab73b85deb3ea3f029b5dbb926e0bf15773c669a07be92d5e984bc
[3566 ms] Start: Run in container: /bin/sh
[3572 ms] Start: Run in container: uname -m
[3705 ms] x86_64
[3705 ms] 
[3706 ms] Start: Run in container: (cat /etc/os-release || cat /usr/lib/os-release) 2>/dev/null
[3710 ms] PRETTY_NAME="Debian GNU/Linux 10 (buster)"
NAME="Debian GNU/Linux"
VERSION_ID="10"
VERSION="10 (buster)"
VERSION_CODENAME=buster
ID=debian
HOME_URL="https://www.debian.org/"
SUPPORT_URL="https://www.debian.org/support"
BUG_REPORT_URL="https://bugs.debian.org/"
[3710 ms] 
[3710 ms] Start: Run in container: cat /etc/passwd
[3713 ms] Start: Setup shutdown monitor
[3714 ms] Forking shutdown monitor: /home/jo/.vscode/extensions/ms-vscode-remote.remote-containers-0.194.3/dist/shutdown/shutdownMonitorProcess /run/user/1000/vscode-remote-containers-ac078fa1afdb826f311776a80a9ef3ffdedab20d.sock dockerCompose Debug /home/jo/.config/Code/logs/20220510T114040/exthost1/ms-vscode-remote.remote-containers 1652193652786
[3723 ms] Start: Run in container: test -d /home/node/.vscode-server
[3726 ms] 
[3727 ms] 
[3727 ms] Start: Run in container: test -f /var/vscode-server/.patchEtcEnvironmentMarker
[3730 ms] 
[3730 ms] 
[3731 ms] Start: Run in container: test -f /var/vscode-server/.patchEtcProfileMarker
[3735 ms] 
[3735 ms] 
[3735 ms] Start: Run in container: test ! -f '/home/node/.vscode-server/data/Machine/.writeMachineSettingsMarker' && set -o noclobber && mkdir -p '/home/node/.vscode-server/data/Machine' && { > '/home/node/.vscode-server/data/Machine/.writeMachineSettingsMarker' ; } 2> /dev/null
[3737 ms] 
[3737 ms] 
[3737 ms] Exit code 1
[3738 ms] Start: Run in container: cat /home/node/.vscode-server/data/Machine/settings.json
[3740 ms] {
        "terminal.integrated.defaultProfile.linux": "zsh"
}
[3740 ms] 
[3741 ms] Start: Run in container: test -d /home/node/.vscode-server/bin/57fd6d0195bb9b9d1b49f6da5db789060795de47
[3742 ms] 
[3742 ms] 
[3743 ms] Start: Launching Remote-Containers helper.
[3744 ms] Start: Run: gpgconf --list-dir agent-extra-socket
[3753 ms] /run/user/1000/gnupg/S.gpg-agent.extra
[3754 ms] 
[3754 ms] Start: Run in container: gpgconf --list-dir agent-socket
[3755 ms] 
[3756 ms] /bin/sh: 10: gpgconf: not found
[3756 ms] Exit code 127
[3758 ms] userEnvProbe: loginInteractiveShell (default)
[3758 ms] userEnvProbe shell: /bin/bash
[3759 ms] Start: Run in container: # Test for /home/node/.ssh/known_hosts and ssh
[3760 ms] /home/node/.ssh/known_hosts exists
[3760 ms] 
[3761 ms] Exit code 1
[3761 ms] Start: Run in container: cat <<'EOF-/tmp/vscode-remote-containers-75d330d1ae80e8eb10ca3d468a6b208882b2c600.js' >/tmp/vscode-remote-containers-75d330d1ae80e8eb10ca3d468a6b208882b2c600.js
[3761 ms] Start: Run in container: /bin/sh
[3767 ms] Start: Run in container: command -v git >/dev/null 2>&1 && git config --system credential.helper '!f() { /home/node/.vscode-server/bin/57fd6d0195bb9b9d1b49f6da5db789060795de47/node /tmp/vscode-remote-containers-75d330d1ae80e8eb10ca3d468a6b208882b2c600.js $*; }; f' || true
[3768 ms] 
[3768 ms] 
[3769 ms] Start: Run in container: cat <<'EOF-/tmp/vscode-remote-containers-server-75d330d1ae80e8eb10ca3d468a6b208882b2c600.js' >/tmp/vscode-remote-containers-server-75d330d1ae80e8eb10ca3d468a6b208882b2c600.js
[3775 ms] 
[3775 ms] 
[3776 ms] Start: Run in container: /home/node/.vscode-server/bin/57fd6d0195bb9b9d1b49f6da5db789060795de47/node /tmp/vscode-remote-containers-server-75d330d1ae80e8eb10ca3d468a6b208882b2c600.js
[3941 ms] 
[3941 ms] 
[3942 ms] Start: Preparing Extensions
[3942 ms] Start: Run in container: test ! -f '/home/node/.vscode-server/data/Machine/.installExtensionsMarker' && set -o noclobber && mkdir -p '/home/node/.vscode-server/data/Machine' && { > '/home/node/.vscode-server/data/Machine/.installExtensionsMarker' ; } 2> /dev/null
[3944 ms] 
[3945 ms] 
[3945 ms] Exit code 1
[3948 ms] Extensions cache, install extensions: None
[3948 ms] Start: Run in container: test -d /home/node/.vscode-server/extensionsCache && ls /home/node/.vscode-server/extensionsCache || true
[3957 ms] bmewburn.vscode-intelephense-client-1.8.2
christian-kohler.path-intellisense-2.8.0
dbaeumer.vscode-eslint-2.2.1
donjayamanne.githistory-0.6.19
esbenp.prettier-vscode-9.5.0
firsttris.vscode-jest-runner-0.4.47
hazer.reactcodesnippets-1.2.1
mikestead.dotenv-1.0.1
ms-vscode-remote.remote-containers-0.194.3
ms-vscode.vscode-typescript-tslint-plugin-1.3.4
naumovs.color-highlight-2.5.0
oderwat.indent-rainbow-8.3.1
shan.code-settings-sync-3.4.3
streetsidesoftware.code-spell-checker-2.1.11
visualstudioexptteam.vscodeintellicode-1.2.20
[3958 ms] 
[3960 ms] Extensions cache, copy to remote: None
[3961 ms] Start: Run in container: for pid in `cd /proc && ls -d [0-9]*`; do { echo $pid ; readlink /proc/$pid/cwd ; readlink /proc/$pid/ns/mnt ; cat /proc/$pid/stat | tr "
[4052 ms] Start: Starting VS Code Server
[4052 ms] Start: Run in container: /home/node/.vscode-server/bin/57fd6d0195bb9b9d1b49f6da5db789060795de47/server.sh --log debug --force-disable-user-env --use-host-proxy --disable-telemetry --port 0 --extensions-download-dir /home/node/.vscode-server/extensionsCache --start-server --disable-websocket-compression
[4412 ms] *
* Visual Studio Code Server
*
* By using the software, you agree to
* the Visual Studio Code Server License Terms (https://aka.ms/vscode-server-license) and
* the Microsoft Privacy Statement (https://privacy.microsoft.com/en-US/privacystatement).
*
[4416 ms] userEnvProbe PATHs:
Probe:     '/usr/local/sbin:/usr/local/bin:/usr/sbin:/usr/bin:/sbin:/bin'
Container: '/usr/local/sbin:/usr/local/bin:/usr/sbin:/usr/bin:/sbin:/bin'
[4417 ms] To accept the license terms, start the server with --accept-server-license-terms
[4421 ms] Command failed: /home/node/.vscode-server/bin/57fd6d0195bb9b9d1b49f6da5db789060795de47/server.sh --log debug --force-disable-user-env --use-host-proxy --disable-telemetry --port 0 --extensions-download-dir /home/node/.vscode-server/extensionsCache --start-server --disable-websocket-compression
[13966 ms] Extensions cache, remote removals: None

```

## post-b

Oi Luiz,

Desculpe mas não sei o que houve com a formatação, parece que virou tudo texto corrido. Não consigo também ver o preview ao lado.

Com relação ao erro no construtor, resolvi invertendo as linhas como sugerido. Acompanhei uma issue no github/typescript bem acaloradas sobre super() ser o primeiro statement. Concordo com vc que nesse caso não há problema em criar o base-object para validar depois.

Obrigado pela dica do tsc:check, reparei que havia um erro que  tinha passado despercebido. Surgiu então mais uma dúvida, não sei se seria melhor abrir novo thread mas em todo caso, segue abaixo.

Ocorre em runRule, na chamada method.apply():

```
function runRule({
    value,
    property,
    rule,
    params = []
}: Omit<ExpectedRule, "error">) {
    const validator = ValidatorRules.values(value, property);
    const method = validator[rule];
    method.apply(validator, params);
}
```

```
The 'this' context of type '(() => Omit<ValidatorRules, "string">) | (() => Omit<ValidatorRules, "boolean">) | (() => Omit<ValidatorRules, "required">) | ((max: number) => Omit<...>)' is not assignable to method's 'this' of type '(this: ValidatorRules) => Omit<ValidatorRules, "string">'.
  Type '() => Omit<ValidatorRules, "boolean">' is not assignable to type '(this: ValidatorRules) => Omit<ValidatorRules, "string">'.
    Property 'boolean' is missing in type 'Omit<ValidatorRules, "boolean">' but required in type 'Omit<ValidatorRules, "string">'.ts(2684)
```

Só consegui resolver trocando de 'private' para 'public' o parametro 'value' do construtor em 'validator-rules.ts' , como visto abaixo. Não entendi bem o motivo.

```
export default class ValidatorRules {
    private constructor( private value: any,  private property: string) { }
```

Solução que eliminou todos os erros. Deu green! Porque?

```
export default class ValidatorRules {
    private constructor( public value: any,  private property: string) { }
```



