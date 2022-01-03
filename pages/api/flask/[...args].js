// COMMENT THIS FOR PRODUCTION:
import { createProxyMiddleware } from "http-proxy-middleware";
export default createProxyMiddleware({
  target: "http://localhost:5000", //the data server
  changeOrigin: true
});
export const config = {
  api: {
    bodyParser: false,
  },
}