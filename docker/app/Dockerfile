FROM openjdk:17-slim

ENV ANDROID_SDK_TOOLS 9477386
ENV ANDROID_SDK_URL https://dl.google.com/android/repository/commandlinetools-linux-${ANDROID_SDK_TOOLS}_latest.zip
ENV ANDROID_BUILD_TOOLS_VERSION 33.0.0
ENV ANDROID_HOME /usr/local/android-sdk-linux
ENV ANDROID_VERSION 33
ENV ANDROID_NDK_VERSION 23.1.7779620
ENV ANDROID_CMAKE_VERSION 3.22.1
ENV PATH $PATH:$ANDROID_HOME/tools:$ANDROID_HOME/tools/bin:$ANDROID_HOME/platform-tools:$ANDROID_HOME/cmdline-tools/bin

ENV EXPO_TOKEN=0RB0f2z4Y20N8bikt7FNhFh1nuarvnX9eKWDijL1

USER root

RUN apt-get update && \
    apt-get install -y --no-install-recommends unzip curl git && \
    mkdir "$ANDROID_HOME" .android && \
    cd "$ANDROID_HOME" && \
    curl -o sdk.zip $ANDROID_SDK_URL && \
    unzip sdk.zip && \
    rm sdk.zip && \
    yes | sdkmanager --licenses --sdk_root=$ANDROID_HOME && \
    sdkmanager --update --sdk_root=$ANDROID_HOME && \
    sdkmanager --sdk_root=$ANDROID_HOME "build-tools;${ANDROID_BUILD_TOOLS_VERSION}" \
    "platforms;android-${ANDROID_VERSION}" \
    "sources;android-${ANDROID_VERSION}" \
    "cmake;${ANDROID_CMAKE_VERSION}" \
    "platform-tools" \
    "ndk;${ANDROID_NDK_VERSION}" \
    "extras;android;m2repository" \
    "extras;google;m2repository" && \
    rm -rf /var/lib/apt/lists/* /tmp/* /var/tmp/* && \
    apt-get autoremove -y && \
    apt-get clean

ENV NODE_VERSION 18.16.1
RUN curl -o- https://raw.githubusercontent.com/nvm-sh/nvm/v0.39.0/install.sh | bash
ENV NVM_DIR /root/.nvm
RUN . "$NVM_DIR/nvm.sh" && nvm install ${NODE_VERSION}
RUN . "$NVM_DIR/nvm.sh" && nvm use v${NODE_VERSION}
RUN . "$NVM_DIR/nvm.sh" && nvm alias default v${NODE_VERSION}
ENV PATH="/root/.nvm/versions/node/v${NODE_VERSION}/bin/:${PATH}"
RUN node --version
RUN npm --version
RUN npm install -g eas-cli

RUN git config --global user.name "Builder" && \
    git config --global user.email "builder@email.com"

WORKDIR /home/src/app/app

COPY . ./

RUN git config --global --add safe.directory /home/src/app && \
    git init && \
    git add . && \
    git commit -m "Initial commit" || echo "Git commit failed, but continuing..."

CMD ["/bin/bash", "-c", "eas build --profile preview --platform android --local"]