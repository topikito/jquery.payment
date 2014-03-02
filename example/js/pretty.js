var prettyCards = (function($)
{

	// CSS
	var invalidClassName = 'invalid',
		bnwClassName = 'desaturate',
		imageSize = 48;

	// jQuery.payment constants
	var formatNumeric = 'restrictNumeric',
		formatCardNumber = 'formatCardNumber',
		formatCardExpiry = 'formatCardExpiry',
		formatCardCVC = 'formatCardCVC';

	// Selectors
	var typeNumericDataName = 'type-numeric',
		typeCardNumberDataName = 'type-card-number',
		typeCardExpiryDataName = 'type-card-expiry',
		typeCardCVCDataName = 'type-card-cvc',

		cardIconWrapperClassName = '.card-icon-wrapper';

	var defaultCard = 'bank';

	var appSupportedCards = [
		'visa',
		'mastercard',
		'amex',
		'discover'
	];

	var apiSupportedCards = [
		'visa',
		'mastercard',
		'discover',
		'amex',
		'dinersclub',
		'maestro',
		'laser',
		'unionpay'
	];

	var lastCardType = '';
	var setCardTypeImage = function(number)
	{
		var cardType = $.payment.cardType(number);
		if (cardType == lastCardType)
		{
			return false;
		}

		lastCardType = cardType;

		$(cardIconWrapperClassName + ' img').addClass(bnwClassName);
		if (cardType && cardType.indexOf(cardType) != -1)
		{
			// It's supported
			console.log(cardType);
			console.log(cardIconWrapperClassName);
			$(cardIconWrapperClassName).find('.' + cardType).removeClass(bnwClassName);
		}

		return true;
	};

	var validateCardNumber = function(e)
	{
		var number = $(this).val();

		var result = $.payment.validateCardNumber(number);
		setCardTypeImage(number);

		if (!result)
		{
			$(this).addClass(invalidClassName)
		}
		else
		{
			$(this).removeClass(invalidClassName)
		}

		return result;
	};

	var validateCardExpiry = function(expiry)
	{
		return $.payment.validateCardExpiry(expiry);
	};

	var validateCardCVC = function(cvc)
	{
		return $.payment.validateCardCVC(cvc);
	};

	var checkInputs = function(e)
	{
		e.preventDefault();
		$('input').removeClass('invalid');
		$('.validation').removeClass('passed failed');

		var cardType = $.payment.cardType($('.cc-number').val());

		$('.cc-number').toggleClass('invalid', !$.payment.validateCardNumber($('.cc-number').val()));
		$('.cc-exp').toggleClass('invalid', !$.payment.validateCardExpiry($('.cc-exp').payment('cardExpiryVal')));
		$('.cc-cvc').toggleClass('invalid', !$.payment.validateCardCVC($('.cc-cvc').val(), cardType));

		if ( $('input.invalid').length ) {
			$('.validation').addClass('failed');
		} else {
			$('.validation').addClass('passed');
		}
	};


	var ignition = function()
	{
		$('[data-' + typeNumericDataName + ']').payment(formatNumeric);

		$('[data-' + typeCardNumberDataName + ']').payment(formatCardNumber);
		$('[data-' + typeCardExpiryDataName + ']').payment(formatCardExpiry);
		$('[data-' + typeCardCVCDataName + ']').payment(formatCardCVC);

		$(document).on('keyup', '[data-' + typeCardNumberDataName + ']', validateCardNumber);
		$(document).on('keyup', '[data-' + typeCardExpiryDataName + ']', validateCardExpiry);
		$(document).on('keyup', '[data-' + typeCardCVCDataName + ']', validateCardCVC);
	};

	return {
		'ignition' : ignition
	};

})(jQuery);