export const loadScript = (url, callback) => {
    const index = document.getElementsByTagName('script')[0];
    const script = document.createElement('script');
    script.src = url;
    script.async = true;
    script.defer = true;
    index.parentNode.insertBefore(script, index);
    script.addEventListener(`load`, callback);
    return () => script.removeEventListener(`load`, callback);
}