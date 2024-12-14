export default defineEventHandler(event => {
  console.log(event);
  event.context.user = { name: 'Nitro' };
});
