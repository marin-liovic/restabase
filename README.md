# restabase
REST inteface for your database.

##Instructions
###Install
Prerequisites: You will need `node`, `npm` and `git` installed.

1. `cd` to folder you want to use
2. clone the repository: `git clone https://github.com/marin-liovic/restabase`
3. `cd` to new restabase folder and run `npm install`


### Run
1. `cd` to install folder
2. edit config files inside `/config`
3. run `node app.js`
4. optionally you can install `forever` globally and use it to run restabase: `forever start app.js`

### API

#### 1. GET /meta 
 - returns information about all available data endpoints

#### 2. GET /data/{table}
 - returns data from the table
 - accepts query parameter `fields` to select returning fields; multiple values should be comma separated
 - accepts query parameters `offset` and `limit` to support pagination
 - supports equality filtering with query parameters: {field_name}={value}
 - supports operators `gt` (greater than), `gte` (greater than or equal), `lt` (less than), `lte` (less than or equal), `ne` (not equal),  `like` (SQL like functionality), `notLike` (SQL not like functionality) with query parameters: {field_name}${operator}={value}


