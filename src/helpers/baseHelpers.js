import DOMPurify from "dompurify";

function ConvertToBase(html) {
  const cleanHTML = DOMPurify.sanitize(html);

  return btoa(cleanHTML);
}

function GetHtml(base) {
  const htmlContent = atob(base);
  let sanitizedData = "";
  if (htmlContent) {
    sanitizedData = () => ({
      __html: DOMPurify.sanitize(htmlContent),
    });
  }
  return sanitizedData();
}

export { ConvertToBase, GetHtml };
