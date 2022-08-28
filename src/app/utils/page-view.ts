
export class PageView
{
    listView:boolean = false;
    createView:boolean = false;
    detailView:boolean = false;

    public static listView():PageView
    {
        let pageView:PageView = new PageView();
        pageView.listView = true;

        return pageView;
    }

    public close()
    {
        this.listView = false;
        this.createView = false;
        this.detailView = false;
    }

    public resetToListView()
    {
        this.close();
        this.listView = true;
    }

    public resetToCreateView()
    {
        this.close();
        this.createView = true;
    }

    public resetToDetailView()
    {
        this.close();
        this.detailView = true;
    }
}