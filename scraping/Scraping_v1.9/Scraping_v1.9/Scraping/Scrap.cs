using System;
using System.Collections.Generic;
using System.Linq;
using System.Net;
using System.Web;
using HtmlAgilityPack;
using ScrapySharp.Extensions;

namespace Scraping_v1._9.Scraping
{
    class Scrap
    {
        //-------------Amazon--------------------------------
        public string getFromAmazon(string item)
        {
            string price = "";
            System.Net.ServicePointManager.SecurityProtocol = SecurityProtocolType.Tls12;
            try
            {
                HtmlWeb web = new HtmlWeb();
                string itemParam = item.Replace(" ", "+");
                string url = "https://www.amazon.com.mx/s?k=" + itemParam.Replace("\"", "");

                HtmlDocument doc = web.Load(url);

                int c = 0;
                foreach (var node in doc.DocumentNode.CssSelect(".a-offscreen"))
                {
                    if (c == 0)
                    {
                        price = node.InnerHtml;

                    }
                    c++;
                }


                return price;
            }
            catch (Exception ex)
            {
                return "404";
            }
        }
        public string getTitleFromAmazon(string item)
        {

            string price = "";

            System.Net.ServicePointManager.SecurityProtocol = SecurityProtocolType.Tls12;
            try
            {
                HtmlWeb web = new HtmlWeb();
                string itemParam = item.Replace(" ", "+");
                string url = "https://www.amazon.com.mx/s?k=" + itemParam.Replace("\"", "");
                HtmlDocument doc = web.Load(url);

                HtmlNode node = doc.DocumentNode.CssSelect(".a-size-medium.a-color-base.a-text-normal").First();
                price = node.InnerHtml;
                return price;

            }
            catch (Exception)
            {
                return "404";
            }
        }
        public string urlVs(string item)
        {
            string itemParam = item.Replace(" ", "+");
            return "https://www.amazon.com/s?k=" + itemParam.Replace("\"", "");
        }
        //-----------------------------------------------------

        //------------mercadolibre----------------------------
        public string getFromMercadoLibre(string item)
        {
            string price = "";
            System.Net.ServicePointManager.SecurityProtocol = SecurityProtocolType.Tls12;
            try
            {
                HtmlWeb web = new HtmlWeb();
                string itemParam = item.Replace(" ", "+");
                string url = "https://listado.mercadolibre.com.mx/" + itemParam.Replace("\"", "");

                HtmlDocument doc = web.Load(url);
                HtmlNode node = doc.DocumentNode.CssSelect(".price__fraction").First();
                price = node.InnerHtml;
                return price;
            }
            catch (Exception)
            {
                return "404";
            }
        }
        public string getTitleMercadoLibre(string item)
        {
            string price = "";
            System.Net.ServicePointManager.SecurityProtocol = SecurityProtocolType.Tls12;
            try
            {
                HtmlWeb web = new HtmlWeb();
                string itemParam = item.Replace(" ", "+");
                string url = "https://listado.mercadolibre.com.mx/" + itemParam.Replace("\"", "");

                HtmlDocument doc = web.Load(url);
                HtmlNode node = doc.DocumentNode.CssSelect(".main-title").First();
                price = node.InnerHtml;
                return price;
            }
            catch (Exception)
            {
                return "404";
            }
        }
        public string getUrlMercadoLibre(string item)
        {
            System.Net.ServicePointManager.SecurityProtocol = SecurityProtocolType.Tls12;
            try
            {
                HtmlWeb web = new HtmlWeb();
                string itemParam = item.Replace(" ", "+");
                string url = "https://listado.mercadolibre.com.mx/" + itemParam.Replace("\"", "");

                return url;
            }
            catch (Exception)
            {
                return "404";
            }
        }
        //---------------------------------------------------------------

        //-----------------------walmart----------------------------
        public string getFromWalMart(string item)
        {
            string price = "";
            System.Net.ServicePointManager.SecurityProtocol = SecurityProtocolType.Tls12;
            try
            {
                HtmlWeb web = new HtmlWeb();
                string itemParam = item.Replace(" ", "%20");
                string url = "https://www.walmart.com.mx/productos?Ntt=" + itemParam.Replace("\"", "");

                HtmlDocument doc = web.Load(url);
                HtmlNode node = doc.DocumentNode.CssSelect("._34YSfGmQlYtq5kY7JLZ7Ib._2kQ1-QPpgSD8TJN44c92X4._3URSxitsrGAcwITNRI6nvM._3gbr9asmWMWg46cLQUnSFZ").First();
                price = node.InnerHtml;
                return price;
            }
            catch (Exception)
            {
                return "404";
            }
        }
        public string getTitleFromWalMart(string item)
        {
            string price = "";
            System.Net.ServicePointManager.SecurityProtocol = SecurityProtocolType.Tls12;
            try
            {
                HtmlWeb web = new HtmlWeb();
                //string itemParam = item.Replace(" ", "+");
                string itemParam = item.Replace(" ", "%20");

                string url = "https://www.walmart.com.mx/productos?Ntt=" + itemParam.Replace("\"", "");

                HtmlDocument doc = web.Load(url);
                HtmlNode node = doc.DocumentNode.CssSelect("._34YSfGmQlYtq5kY7JLZ7Ib").First();
                price = node.InnerHtml;
                return price;
            }
            catch (Exception)
            {
                return "404";
            }
        }
        public string getUrlWalMart(string item)
        {
            string itemParam = item.Replace(" ", "%20");

            return "https://www.walmart.com.mx/productos?Ntt=" + itemParam.Replace("\"", "");

        }
        //--------------------------------------------------------

        //-------------ebay---------------------------------------
        public string getFromEbay(string item)
        {
            string price = "";
            System.Net.ServicePointManager.SecurityProtocol = SecurityProtocolType.Tls12;
            try
            {
                HtmlWeb web = new HtmlWeb();
                string itemParam = item.Replace(" ", "+");
                string url = "https://www.ebay.com/sch/i.html?_nkw=" + itemParam.Replace("\"", "");

                HtmlDocument doc = web.Load(url);
                HtmlNode node = doc.DocumentNode.CssSelect(".s-item__price").First();
                price = node.InnerHtml;
                return price;
            }
            catch (Exception)
            {
                return "404";
            }
        }
        public string getTitleEbay(string item)
        {
            string price = "";
            System.Net.ServicePointManager.SecurityProtocol = SecurityProtocolType.Tls12;
            try
            {
                HtmlWeb web = new HtmlWeb();
                string itemParam = item.Replace(" ", "+");
                string url = "https://www.ebay.com/sch/i.html?_nkw=" + itemParam.Replace("\"", "");

                HtmlDocument doc = web.Load(url);
                HtmlNode node = doc.DocumentNode.CssSelect(".s-item__title").First();
                price = node.InnerHtml;
                return price;
            }
            catch (Exception)
            {
                return "404";
            }
        }
        public string getUrlEbay(string item)
        {
            string itemParam = item.Replace(" ", "+");
            return "https://www.ebay.com/sch/i.html?_nkw=" + itemParam.Replace("\"", "");

        }
    }
}
