const notshownFields = ['_id', '__v',
'password'
]
module.exports = {
    Query: {
       getColumns: async (_, { model }, ctx) => {
         const myschema = ctx[model].schema;
         var res = [];
         myschema.eachPath((path) => {
           let f = {};
           f.name = path;
           f.type = myschema.paths[path].instance;
           f.required = false ,
           f.label = "",
           f.align = "left",
           f.field = 'row => row.field',
           f.format = 'val => `${val}`',
           f.sortable = true,
           f.classes = '',
           f.style = '',
           f.headerClasses= ''
     
           res.push(f);
         });
     
         return res;
       },
    },
    Mutation: {}
  };