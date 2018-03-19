Ext.define('MySpots.fwk.util.StringUtils',{
	singleton : true,
	/*
		Replaces the character at the specified index with
		the supplied string and returns a new string

		@param original - the original string
		@param replaceWith - the string replace with
		@param atIndex - the index to replace at

		@return a new string with specified index replaced
	*/
	replaceAt : function( original, replaceWith, atIndex )
	{
		var newStr = original;
		newStr = newStr.substring( 0, atIndex ) + replaceWith + newStr.substring( atIndex + 1 );
		return newStr;
	}
});