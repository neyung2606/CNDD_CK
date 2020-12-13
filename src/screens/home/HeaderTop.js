import React from 'react';
import { View, Text, TouchableOpacity } from 'react-native';
import Block from '../../components/body/Block';
import TextView from '../../components/body/TextView';
import ButtonMain from '../../components/body/ButtonMain';

import Feather from 'react-native-vector-icons/Feather';
const HeaderTop = ({ title, moreTitle, moreIcon }) => {
	return (
		<Block direction="row" justifyContent="space-between">
			<TextView bold h6>
				{title}
			</TextView>
			<ButtonMain>
				<Block direction="row" middle>
					<Feather size={18} color="#ADABAC" name={moreIcon} />
					<TextView color="#ADABAC">{moreTitle}</TextView>
				</Block>
			</ButtonMain>
		</Block>
	);
};

export default HeaderTop;
