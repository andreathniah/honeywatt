// this is the code which will be injected into a given page
(function () {
  // To remove all inline style tags (eg: <style></style>)
  document
    .querySelectorAll("style")
    .forEach((el) => el.parentNode.removeChild(el));

  // To remove all inline styles (eg: style="widh:100px")
  document
    .querySelectorAll("[style]")
    .forEach((el) => el.removeAttribute("style"));
  // To remove link external stylesheet (eg: <link rel="stylesheet")
  document
    .querySelectorAll('link[rel="stylesheet"]')
    .forEach((el) => el.parentNode.removeChild(el));

  // Removes indention and forces the string into a straight line
  const htmlInStrings = `
    <div class="container-fluid page">
      <div class="card">
        <div class="card-body">
          <h5 class="card-title">PH!SH ALERT</h5>
          <h6 class="card-subtitle mb-3 text-muted">
            for <span class="font-italic">http://www.legalplus.cl/Banks/CiTi%20Bank/citi/login.php</span>
          </h6>
          <div class="card-text">
            <p>
              Our algorithm have identified this link to be a phishing site. It
              is now banned from your network space.
            </p>
            <p>The site you are looking for can be found at:</p>
            <div class="alertbox">
              <a
                href="https://www.citibank.com.sg/"
                class="btn btn-outline-primary"
                style="width: 100%;"
                >https://www.citibank.com.sg/</a
              >
            </div>
          </div>
        </div>
      </div>
    </div>
    `
    .replace(/\n|\t/g, " ")
    .replace(/> *</g, "><");

  document.outerHTML = "";
  document.body.innerHTML = `${htmlInStrings}`;
})();
