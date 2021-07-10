FROM node:lts-alpine as build
WORKDIR /usr/src/app
COPY ./ .
# 国内构建
# RUN npm config set registry https://registry.npm.taobao.org \
#     && npm install \
RUN npm install \
    && npm install -g typescript modclean 
RUN npm run build \
    && npm prune --production \
    && npm run modclean \
    && mkdir builddir \
    && mv -f dist tools node_modules package.json builddir \
    && mkdir builddir/config

FROM node:lts-alpine as runtime
WORKDIR /usr/src/app
COPY --from=build /usr/src/app/builddir .
ENTRYPOINT ["node", "tools/processConfig.js", "&&"]
CMD ["npm", "run", "start:muilt"]
