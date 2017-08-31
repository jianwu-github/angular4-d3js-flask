FROM ubuntu:16.04

MAINTAINER Jian Wu <hellojianwu@gmail.com>
ENV REFRESHED_AT 2017-08-31

RUN apt-get update && apt-get install -y sudo
RUN apt-get update && apt-get install -y curl

# Install Python
RUN DEBIAN_FRONTEND=noninteractive apt-get install -y python python-setuptools python-pkg-resources python-pip python-dev libffi-dev

RUN pip install pywebhdfs
RUN pip install python-hosts