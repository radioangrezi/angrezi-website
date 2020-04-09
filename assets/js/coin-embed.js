var ra_coin_embed = (options) => {
  const style = (size, position) => {
    const defaultSize = size || "300px";

    if (!(typeof defaultSize === "string"))
        throw new Error("size must be css string literal");
    const defaultPosition = position || "bottom-right";
    const possiblePossitions = ["top-right", "bottom-right", "bottom-left", "top-left"];
    if (!possiblePossitions.includes(defaultPosition)) 
        throw new Error(`position must be ${possiblePossitions.join(", ")}`);

    const top =
      defaultPosition === "top-right" || defaultPosition === "top-left";
    const right =
      defaultPosition === "top-right" || defaultPosition === "bottom-right";
    const bottom =
      defaultPosition === "bottom-left" || defaultPosition === "bottom-right";
    const left =
      defaultPosition === "top-left" || defaultPosition === "bottom-left";

    const css = `
.donate-overlay {
    position: fixed;
    height: ${defaultSize};
    width: ${defaultSize};
    top: ${top ? "30px" : "auto"};    
    right: ${right ? "30px" : "auto"};    
    bottom: ${bottom ? "30px" : "auto"};    
    left: ${left ? "30px" : "auto"};
    z-index: 9998;
    transition: transform .3s; }
    .donate-overlay:hover {
      text-decoration: none;
      transform: scale(1.2); }
    .donate-overlay .donate-coin {
      position: absolute;
      top: 14%;
      left: 15%;
      width: 70%;
      height: 70%;
      transition: transform 0.5s;
      z-index: 9999; }
      .donate-overlay .donate-coin:active {
        transform: translateY(-100vh); }
  
  .rotate {
    animation: rotate 11s linear infinite; }
  
  @keyframes rotate {
    from {
      transform: rotate(0deg); }
    to {
      transform: rotate(360deg); } }
`;
        return css;
  };

  const html = `
<a class="donate-overlay" target="_blank" href="https://www.betterplace.me/safe-club-culture-safe-solidarity-unitedwestreamhb">
    <img class="rotate donate-font" src='http://radioangrezi.de/assets/images/donate.svg' />
    <img class="donate-coin" src='http://radioangrezi.de/assets/images/coin-transparent.gif' />
</a>
`;

  const appendCSS = () => {
    var styleSheet = document.createElement("style");
    styleSheet.type = "text/css";
    styleSheet.innerText = style();
    const { size, position } = options || {};
    styleSheet.innerText = style(size, position);
    document.head.appendChild(styleSheet);
  };

  const appendHtml = () => {
    document.body.insertAdjacentHTML("beforeend", html);
  };

  appendCSS();
  appendHtml();
};
