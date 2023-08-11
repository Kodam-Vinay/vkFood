const useDeviceCheck = () => {
  let checkIsOnline = false;

  const checkIsMobile = () => {
    const toMatch = [
      /Android/i,
      /webOS/i,
      /iPhone/i,
      /iPad/i,
      /iPod/i,
      /BlackBerry/i,
      /Windows Phone/i,
    ];
    checkIsOnline = toMatch.some((each) => {
      return navigator.userAgent.match(each);
    });
  };
  checkIsMobile();
  return checkIsOnline;
};

export default useDeviceCheck;
