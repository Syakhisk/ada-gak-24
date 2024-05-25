import axios from "axios";

export const baseURL = "http://24solver.us-west-2.elasticbeanstalk.com";

export default async function handler(req, res) {
  const _res = await axios.get(baseURL, {
    params: req.query,
  });

  // find this and parse the number:
  // <h3>0 solutions found</h3>
  const matched = _res.data.match(/(\d+) solutions found/);
  const found = parseInt(matched[1]) > 0;
  const url = _res.request.res.responseUrl;
  res.status(200).json({ found, count: parseInt(matched[1]), url });
}
