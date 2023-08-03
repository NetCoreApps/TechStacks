export default function(context) {
    const slug = context.params && context.params.slug;
    document.title = slug 
        ? slug + ' - techstacks.io'
        : 'techstacks.io';
}