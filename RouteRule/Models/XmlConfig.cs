namespace RouteRule.Models;

// NOTE: Generated code may require at least .NET Framework 4.5 or .NET Core/Standard 2.0.
/// <remarks/>
[System.SerializableAttribute()]
[System.ComponentModel.DesignerCategoryAttribute("code")]
[System.Xml.Serialization.XmlTypeAttribute(AnonymousType = true)]
[System.Xml.Serialization.XmlRootAttribute(Namespace = "", IsNullable = false)]
public partial class configuration
{

    private configurationSystemwebServer systemwebServerField;

    /// <remarks/>
    [System.Xml.Serialization.XmlElementAttribute("system.webServer")]
    public configurationSystemwebServer systemwebServer
    {
        get
        {
            return this.systemwebServerField;
        }
        set
        {
            this.systemwebServerField = value;
        }
    }
}

/// <remarks/>
[System.SerializableAttribute()]
[System.ComponentModel.DesignerCategoryAttribute("code")]
[System.Xml.Serialization.XmlTypeAttribute(AnonymousType = true)]
public partial class configurationSystemwebServer
{

    private configurationSystemwebServerRewrite rewriteField;

    /// <remarks/>
    public configurationSystemwebServerRewrite rewrite
    {
        get
        {
            return this.rewriteField;
        }
        set
        {
            this.rewriteField = value;
        }
    }
}

/// <remarks/>
[System.SerializableAttribute()]
[System.ComponentModel.DesignerCategoryAttribute("code")]
[System.Xml.Serialization.XmlTypeAttribute(AnonymousType = true)]
public partial class configurationSystemwebServerRewrite
{

    private configurationSystemwebServerRewriteRule[] rulesField;

    /// <remarks/>
    [System.Xml.Serialization.XmlArrayItemAttribute("rule", IsNullable = false)]
    public configurationSystemwebServerRewriteRule[] rules
    {
        get
        {
            return this.rulesField;
        }
        set
        {
            this.rulesField = value;
        }
    }
}

/// <remarks/>
[System.SerializableAttribute()]
[System.ComponentModel.DesignerCategoryAttribute("code")]
[System.Xml.Serialization.XmlTypeAttribute(AnonymousType = true)]
public partial class configurationSystemwebServerRewriteRule
{

    private configurationSystemwebServerRewriteRuleMatch matchField;

    private configurationSystemwebServerRewriteRuleConditions conditionsField;

    private configurationSystemwebServerRewriteRuleAction actionField;

    private string nameField;

    private bool stopProcessingField;

    /// <remarks/>
    public configurationSystemwebServerRewriteRuleMatch match
    {
        get
        {
            return this.matchField;
        }
        set
        {
            this.matchField = value;
        }
    }

    /// <remarks/>
    public configurationSystemwebServerRewriteRuleConditions conditions
    {
        get
        {
            return this.conditionsField;
        }
        set
        {
            this.conditionsField = value;
        }
    }

    /// <remarks/>
    public configurationSystemwebServerRewriteRuleAction action
    {
        get
        {
            return this.actionField;
        }
        set
        {
            this.actionField = value;
        }
    }

    /// <remarks/>
    [System.Xml.Serialization.XmlAttributeAttribute()]
    public string name
    {
        get
        {
            return this.nameField;
        }
        set
        {
            this.nameField = value;
        }
    }

    /// <remarks/>
    [System.Xml.Serialization.XmlAttributeAttribute()]
    public bool stopProcessing
    {
        get
        {
            return this.stopProcessingField;
        }
        set
        {
            this.stopProcessingField = value;
        }
    }
}

/// <remarks/>
[System.SerializableAttribute()]
[System.ComponentModel.DesignerCategoryAttribute("code")]
[System.Xml.Serialization.XmlTypeAttribute(AnonymousType = true)]
public partial class configurationSystemwebServerRewriteRuleMatch
{

    private string urlField;

    /// <remarks/>
    [System.Xml.Serialization.XmlAttributeAttribute()]
    public string url
    {
        get
        {
            return this.urlField;
        }
        set
        {
            this.urlField = value;
        }
    }
}

/// <remarks/>
[System.SerializableAttribute()]
[System.ComponentModel.DesignerCategoryAttribute("code")]
[System.Xml.Serialization.XmlTypeAttribute(AnonymousType = true)]
public partial class configurationSystemwebServerRewriteRuleConditions
{

    private configurationSystemwebServerRewriteRuleConditionsAdd addField;

    private string logicalGroupingField;

    private bool trackAllCapturesField;

    /// <remarks/>
    public configurationSystemwebServerRewriteRuleConditionsAdd add
    {
        get
        {
            return this.addField;
        }
        set
        {
            this.addField = value;
        }
    }

    /// <remarks/>
    [System.Xml.Serialization.XmlAttributeAttribute()]
    public string logicalGrouping
    {
        get
        {
            return this.logicalGroupingField;
        }
        set
        {
            this.logicalGroupingField = value;
        }
    }

    /// <remarks/>
    [System.Xml.Serialization.XmlAttributeAttribute()]
    public bool trackAllCaptures
    {
        get
        {
            return this.trackAllCapturesField;
        }
        set
        {
            this.trackAllCapturesField = value;
        }
    }
}

/// <remarks/>
[System.SerializableAttribute()]
[System.ComponentModel.DesignerCategoryAttribute("code")]
[System.Xml.Serialization.XmlTypeAttribute(AnonymousType = true)]
public partial class configurationSystemwebServerRewriteRuleConditionsAdd
{

    private string inputField;

    private string patternField;

    /// <remarks/>
    [System.Xml.Serialization.XmlAttributeAttribute()]
    public string input
    {
        get
        {
            return this.inputField;
        }
        set
        {
            this.inputField = value;
        }
    }

    /// <remarks/>
    [System.Xml.Serialization.XmlAttributeAttribute()]
    public string pattern
    {
        get
        {
            return this.patternField;
        }
        set
        {
            this.patternField = value;
        }
    }
}

/// <remarks/>
[System.SerializableAttribute()]
[System.ComponentModel.DesignerCategoryAttribute("code")]
[System.Xml.Serialization.XmlTypeAttribute(AnonymousType = true)]
public partial class configurationSystemwebServerRewriteRuleAction
{

    private string typeField;

    private string urlField;

    private bool logRewrittenUrlField;

    /// <remarks/>
    [System.Xml.Serialization.XmlAttributeAttribute()]
    public string type
    {
        get
        {
            return this.typeField;
        }
        set
        {
            this.typeField = value;
        }
    }

    /// <remarks/>
    [System.Xml.Serialization.XmlAttributeAttribute()]
    public string url
    {
        get
        {
            return this.urlField;
        }
        set
        {
            this.urlField = value;
        }
    }

    /// <remarks/>
    [System.Xml.Serialization.XmlAttributeAttribute()]
    public bool logRewrittenUrl
    {
        get
        {
            return this.logRewrittenUrlField;
        }
        set
        {
            this.logRewrittenUrlField = value;
        }
    }
}



