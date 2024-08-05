interface Props {
  width?: number,
  height?: number,
  color?: string,
  bgColor?: string
}

export default function BookIcon({ width = 378, height = 209, color = "white", bgColor = "#171B36" }: Props) {
  return <>
    <svg width={width} height={height} viewBox="0 0 378 209" fill="none" xmlns="http://www.w3.org/2000/svg">
      <path d="M0 49.4718H29.2202L20.0352 24.1189H46.892L39.4796 0.108887C72.7283 2.31115 102.325 14.1819 130.793 29.4903C106.085 22.8835 81.806 14.8802 55.2714 11.5499C57.5274 18.6401 59.6759 24.6023 61.2873 30.7257C71.2423 69.2921 81.054 107.912 90.7224 146.586C92.1727 151.958 91.4744 159.477 94.8584 163.023C98.2423 166.568 105.225 165.332 110.65 166.084C132.404 169.146 153.621 173.712 172.958 185.045C176.727 187.352 180.318 189.937 183.701 192.78C140.83 189.678 97.772 195.157 57.0439 208.894C44.7435 153.837 28.3071 100.07 0 49.4718ZM35.451 32.1222C37.3847 36.7953 38.9424 40.5016 40.4464 44.2616C56.3376 86.3664 69.2605 129.532 79.1203 173.443C80.4631 178.814 82.6654 179.942 87.8219 179.781C101.734 179.351 115.646 179.298 129.557 179.781C137.776 179.781 145.994 181.446 154.212 182.359C152.716 180.926 150.86 179.924 148.841 179.459C130.912 175.048 112.443 173.239 93.999 174.088C88.6276 174.088 86.7476 172.53 85.4585 167.534C73.7489 123.274 61.9319 79.1754 50.276 35.1302C49.6852 32.928 48.8257 30.8331 48.0738 28.5234L35.451 32.1222ZM72.2449 191.706L31.8522 53.6614L18.2089 58.0122C38.2045 103.155 53.922 150.073 65.1547 198.151L97.7589 189.557L97.4366 187.999L72.2449 191.706Z" fill={color} />
      <path d="M322.497 10.1519L245.901 29.5425C275.497 14.2878 304.986 2.41712 338.45 0L330.984 24.0637H357.84L348.441 49.2555H377.661C349.945 100.069 333.025 153.567 320.832 209C279.871 195.08 236.479 189.759 193.369 193.369C203.071 184.609 214.759 178.342 227.424 175.107C243.538 170.917 260.458 168.124 277.055 165.277C281.943 164.418 284.038 163.182 285.112 157.757C293.763 109.427 305.953 61.7983 321.584 15.2547C321.852 14.449 321.906 13.5896 322.497 10.1519ZM330.017 28.4145C329.211 30.5094 328.405 32.2282 327.868 33.7859C324.538 45.7641 321.047 57.6885 317.931 69.7204C309.516 102.271 301.173 134.839 292.901 167.426C291.719 171.991 289.57 173.549 284.521 173.71C269.75 174.194 254.979 175.268 240.261 176.772C234.079 177.789 227.976 179.243 221.999 181.123L297.627 177.685C309.659 129.343 322.282 79.8186 342.371 31.8522L330.017 28.4145ZM312.936 198.204C324.042 150.068 339.726 103.106 359.774 57.9571L346.185 53.7137C332.541 100.176 319.328 145.994 305.792 191.543L281.352 188.052V189.663L312.936 198.204Z" fill={color} />
      <path d="M35.4504 32.1205L48.0732 28.4143C48.8252 30.724 49.6846 32.8188 50.2754 35.0211C61.9313 79.0663 73.6409 123.165 85.0819 167.318C86.371 172.313 88.0362 174.086 93.6224 173.871C112.066 173.022 130.536 174.831 148.464 179.242C150.483 179.707 152.339 180.71 153.835 182.143C145.617 181.23 137.399 179.779 129.181 179.565C115.269 179.081 101.357 179.135 87.4453 179.565C82.0739 179.565 80.0865 178.705 78.7437 173.226C68.9849 129.489 56.1879 86.4853 40.4458 44.5284C38.9418 40.4999 37.3841 36.7936 35.4504 32.1205Z" fill={bgColor} />
      <path d="M72.2445 191.704L97.4362 187.891L97.7585 189.448L65.1543 198.15C53.9215 150.072 38.2041 103.153 18.2085 58.0108L31.8518 53.66L72.2445 191.704Z" fill={bgColor} />
      <path d="M330.015 28.4143L342.369 32.0668C322.28 80.0332 309.658 129.557 297.626 177.9L221.997 181.337C227.974 179.458 234.077 178.004 240.259 176.986C254.977 175.482 269.748 174.408 284.52 173.925C289.569 173.925 291.717 172.206 292.899 167.64C301.171 135.054 309.514 102.485 317.929 69.935C321.045 57.9031 324.536 45.9787 327.866 34.0005C328.404 32.3354 329.209 30.6166 330.015 28.4143Z" fill={bgColor} />
      <path d="M312.936 198.204L281.138 189.556V187.944L305.577 191.436C318.898 145.887 332.434 100.122 345.97 53.6064L359.56 57.8498C339.579 103.041 323.967 150.039 312.936 198.204Z" fill={bgColor} />
    </svg>
  </>
}
