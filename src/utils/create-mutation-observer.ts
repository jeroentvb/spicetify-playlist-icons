export function createMutationObserver(
   cb: () => Promise<void> | void,
   target = document.body,
   options = { childList: true, subtree: true }
) {
   const observer = new MutationObserver(async () => {
      // Needed to prevent an infinite looooooooooooooooooooooooooooooooooooooooooooooop
      observer.disconnect();

      await cb();

      observer.observe(target, options);
   });


   observer.observe(target, options);

   return observer;
}
