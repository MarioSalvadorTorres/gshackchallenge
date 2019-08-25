using System;
using System.Collections.Generic;
using System.Linq;
using System.Web;
using System.Web.Script.Serialization;
using System.Web.UI;
using System.Web.UI.WebControls;

namespace Scraping_v1._9.Scraping
{
    public partial class Testing : System.Web.UI.Page
    {
        protected void Page_Load(object sender, EventArgs e)
        {

            if (this.Request.QueryString != null)
            {
                Scrap scrap = new Scrap();
                //var modelo = scrap.getFromElektra(href);
                //---------------Amazon--------------------------------------------------------
                string priceAmazon = scrap.getFromAmazon(this.Request.QueryString["search"]);
                string titleAmazon = scrap.getTitleFromAmazon(this.Request.QueryString["search"]);
                string url = scrap.urlVs(this.Request.QueryString["search"]);
                //---------------------------------------------------------------------------------
                //---------------MercadoLibre--------------------------------------------------------
                string priceMercadoLibre = scrap.getFromMercadoLibre(this.Request.QueryString["search"]);
                string titleMercadoLibre = scrap.getTitleMercadoLibre(this.Request.QueryString["search"]);
                string urlMercadoLibre = scrap.getUrlMercadoLibre(this.Request.QueryString["search"]);
                //---------------------------------------------------------------------------------------
                //------------------Walmart---------------------------------------------------------------
                string priceWalmart = scrap.getFromWalMart(this.Request.QueryString["search"]);
                string titleWalMart = scrap.getTitleFromWalMart(this.Request.QueryString["search"]);
                string urlWalMart = scrap.getUrlWalMart(this.Request.QueryString["search"]);
                //----------------------------------------------------------------------------------
                //------------------Ebay---------------------------------------------------------------
                string priceEbay = scrap.getFromEbay(this.Request.QueryString["search"]);
                string titleEbay = scrap.getTitleEbay(this.Request.QueryString["search"]);
                string urlEbay = scrap.getUrlEbay(this.Request.QueryString["search"]);

                List<Store> prop = new List<Store>()
                    {
                        new Store{
                            store ="amazon",
                            items = new Items{
                            price =  priceAmazon,
                            url = url
                            }
                        },
                        new Store
                        {
                            store="Mercado Libre Mx",
                            items = new Items
                            {
                                price = priceMercadoLibre,
                                title = titleMercadoLibre,
                                url = urlMercadoLibre
                            }
                        },
                        new Store
                        {
                            store = "Wal Mart",
                            items = new Items
                            {
                                price = priceWalmart,
                                title = titleWalMart,
                                url = urlWalMart
                            }
                        },
                        new Store
                        {
                            items= new Items
                            {
                                price = priceEbay,
                                title = titleEbay,
                                url = urlEbay
                            }
                        }
        };
                JavaScriptSerializer js = new JavaScriptSerializer();
                var json = js.Serialize(prop);
                Response.Clear();
                Response.ContentType = "application/json; charset=utf-8";
                Response.Write(json);
                Response.End();
            }
        }
    }
}