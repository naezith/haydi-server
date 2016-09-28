#!/bin/sh

export NODE_ENV=production
export PATH=/usr/local/bin:$PATH
forever -w --watchDirectory=/home/haydiserv/routes start /home/haydiserv/bin/www
